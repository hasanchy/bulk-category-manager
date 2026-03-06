<?php
/**
 * API endpoint class for fetching product categories.
 */

namespace BULKCATMAN\Endpoints\V1;

// Avoid direct file request
defined( 'ABSPATH' ) || die( 'No direct access allowed!' );

use BULKCATMAN\Core\Endpoint;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;

class Categories extends Endpoint {
	/**
	 * API endpoint for the current endpoint.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	protected $endpoint = 'categories';

	/**
	 * Register the routes for handling categories functionality.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_routes() {
		\register_rest_route(
			$this->get_namespace(),
			$this->get_endpoint(),
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'get_categories' ),
					'permission_callback' => array( $this, 'edit_permission' ),
				),
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'create_category' ),
					'permission_callback' => array( $this, 'edit_permission' ),
				),
			)
		);
		
		\register_rest_route(
			$this->get_namespace(),
			$this->get_endpoint().'/move',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'move_products' ),
					'permission_callback' => array( $this, 'edit_permission' ),
				),
			)
		);
	}

	/**
	 * Handle the Amazon API connection.
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response|WP_Error
	 * @since 1.0.0
	 */
	public function get_categories( WP_REST_Request $request ) {
		$nonce = $request->get_header( 'X-WP-NONCE' );
		if ( ! \wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new WP_REST_Response( \esc_html__( 'Invalid nonce', 'bulk-category-manager' ), 403 );
		}

		$categories = \get_terms(
			array(
				'taxonomy'   => 'product_cat',
				'orderby'    => 'name',
				'hide_empty' => false,
			)
		);

		return new WP_REST_Response( $categories, 200 );
	}

	public function create_category( WP_REST_Request $request ) {
		$nonce = $request->get_header( 'X-WP-NONCE' );
		if ( ! \wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new WP_REST_Response( \esc_html__( 'Invalid nonce', 'bulk-category-manager' ), 403 );
		}

		$params      = $request->get_params();
		$name        = \sanitize_text_field( $params['name'] );
		$parent      = isset( $params['parent'] ) ? \absint( $params['parent'] ) : 0;
		$description = isset( $params['description'] ) ? \sanitize_textarea_field( $params['description'] ) : '';

		$term = \wp_insert_term(
			$name,
			'product_cat',
			array(
				'parent'      => $parent,
				'description' => $description,
			)
		);

		if ( \is_wp_error( $term ) ) {
			return new WP_REST_Response( $term->get_error_message(), 400 );
		}

		return new WP_REST_Response( \esc_html__( 'Category created successfully', 'bulk-category-manager' ), 201 );
	}

	/**
     * Move products from source categories to destination categories in batches.
     */
    public function move_products(WP_REST_Request $request) {

        $source = $request->get_param('source_categories');
        $destination = $request->get_param('destination_categories');
        $batch_size = intval($request->get_param('batch_size')) ?: 10;

        if (empty($source) || empty($destination)) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'source_categories and destination_categories fields are required.'
            ], 400);
        }

        // Query products in source categories
        $query = new \WP_Query([
            'post_type'      => 'product',
            'posts_per_page' => $batch_size,
            'fields'         => 'ids',
            'tax_query'      => [
                [
                    'taxonomy' => 'product_cat',
                    'field'    => 'term_id',
                    'terms'    => $source,
                ]
            ]
        ]);

        $product_ids = $query->posts;
        $remaining   = $query->found_posts;

        if (empty($product_ids)) {
            return new WP_REST_Response([
                'success' => true,
                'message' => 'No products remaining.',
                'finished' => true,
                'moved' => 0,
                'remaining' => 0
            ]);
        }

        // Process this batch
        foreach ($product_ids as $product_id) {

            $existing_cats = wp_get_post_terms($product_id, 'product_cat', ['fields' => 'ids']);

            // Remove source categories
            $new_categories = array_diff($existing_cats, $source);

            // Add destination categories
            $new_categories = array_unique(array_merge($new_categories, $destination));

            wp_set_post_terms($product_id, $new_categories, 'product_cat');
        }

        return new WP_REST_Response([
            'success'   => true,
            'message'   => 'Batch processed.',
            'finished'  => false,
            'moved'     => count($product_ids),
            'remaining' => max(0, $remaining - $batch_size)
        ]);
    }
}
