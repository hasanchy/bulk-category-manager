<?php
/**
 * Affiliate Products Import block.
 */

namespace BULKPRODMOV\Admin;

// Abort if called directly.
defined( 'ABSPATH' ) || die( 'No direct access allowed!' );

use BULKPRODMOV\Core\Base;

class AdminPage extends Base {
	/**
	 * The page title.
	 *
	 * @var string
	 */
	private $page_title;

	/**
	 * The page slug.
	 *
	 * @var string
	 */
	private $page_slug = 'bulk-product-category-mover-for-woocommerce-admin';

	/**
	 * Page Assets.
	 *
	 * @var array
	 */
	private $page_scripts = array();

	/**
	 * Assets version.
	 *
	 * @var string
	 */
	private $assets_version = '';

	/**
	 * A unique string id to be used in markup and jsx.
	 *
	 * @var string
	 */
	private $unique_id = '';

	/**
	 * Initializes the page.
	 *
	 * @return void
	 * @since 1.0.0
	 *
	 */
	public function init() {
		if ( is_admin() ) {
			$this->page_title     = 'Bulk Product Category Mover for WooCommerce';
			$this->assets_version = ! empty( $this->script_data( 'version' ) ) ? $this->script_data( 'version' ) : BULKPRODMOV_VERSION;
			$this->unique_id      = "bulkprodmov_main_wrap-{$this->assets_version}";

			add_action( 'admin_menu', array( $this, 'register_admin_page' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
			add_filter( 'plugin_action_links_' . BULKPRODMOV_PLUGIN_BASENAME, array( $this, 'add_action_links' ) );
		}
	}

	/**
	 * Add action links to the plugin page.
	 *
	 * @param array $links
	 * @return array
	 */
	public function add_action_links( $links ) {
		$new_links = array(
			'<a href="' . admin_url( 'admin.php?page=' . $this->page_slug ) . '">' . __( 'Move Products', 'bulk-product-category-mover-for-woocommerce' ) . '</a>',
		);
		return array_merge( $new_links, $links );
	}

	public function register_admin_page() {
		$page = add_submenu_page(
			'woocommerce',
			$this->page_title,
			__( 'Product Category Mover', 'bulk-product-category-mover-for-woocommerce' ),
			'manage_options',
			$this->page_slug,
			array( $this, 'callback' )
		);

		add_action( 'load-' . $page, array( $this, 'prepare_assets' ) );
	}

	/**
	 * The admin page callback method.
	 *
	 * @return void
	 */
	public function callback() {
		$this->view();
	}

	/**
	 * Prepares assets.
	 *
	 * @return void
	 */
	public function prepare_assets() {
		if ( ! is_array( $this->page_scripts ) ) {
			$this->page_scripts = array();
		}

		$handle       = 'bulkprodmov_adminpage';
		$src          = BULKPRODMOV_ASSETS_URL . '/js/adminpage.min.js';
		$style_src    = BULKPRODMOV_ASSETS_URL . '/css/adminpage.min.css';
		$dependencies = ! empty( $this->script_data( 'dependencies' ) )
			? $this->script_data( 'dependencies' )
			: array(
				'react',
				'wp-element',
				'wp-i18n',
				'wp-is-shallow-equal',
				'wp-polyfill',
			);

		$this->page_scripts[ $handle ] = array(
			'src'       => $src,
			'style_src' => $style_src,
			'deps'      => $dependencies,
			'ver'       => $this->assets_version,
			'strategy'  => true,
			'localize'  => array(
				'dom_element_id' => $this->unique_id,
				'restEndpoint'   => array(
					'categories'          => esc_url_raw( rest_url() . 'bulk-product-category-mover-for-woocommerce/v1/categories' ),
				),
				'restNonce'      => wp_create_nonce( 'wp_rest' ),
				'adminColors'    => $this->get_admin_colors(),
				'currency'       => array(
					'code'   => get_woocommerce_currency(),
					'symbol' => html_entity_decode( get_woocommerce_currency_symbol(), ENT_QUOTES, 'UTF-8' ),
				),
			),
		);
	}

	protected function get_admin_colors() {
		global $_wp_admin_css_colors;

		$admin_color = get_user_option( 'admin_color' );

		$colors = array();

		if ( isset( $_wp_admin_css_colors[ $admin_color ] ) ) {
			$colors = $_wp_admin_css_colors[ $admin_color ]->colors; //primary, background, highlight, light background
		}

		$primary_color = ! empty( $colors[0] ) ? $colors[0] : '#001529';
		if ( count( $colors ) === 3 ) {
			$highlight_color        = ! empty( $colors[1] ) ? $colors[1] : '#2271b1';
			$light_background_color = ! empty( $colors[2] ) ? $colors[2] : '#2271b1';
		} else {
			$highlight_color        = ! empty( $colors[2] ) ? $colors[2] : '#2271b1';
			$light_background_color = ! empty( $colors[3] ) ? $colors[3] : '#2271b1';
		}

		return array(
			'primary'          => $primary_color,
			'highlight'        => $highlight_color,
			'light_background' => $light_background_color,
			'colors'           => $colors,
		);
	}

	/**
	 * Gets assets data for given key.
	 *
	 * @param string $key
	 *
	 * @return string|array
	 */
	protected function script_data( string $key = '' ) {
		$raw_script_data = $this->raw_script_data();

		return ! empty( $key ) && ! empty( $raw_script_data[ $key ] ) ? $raw_script_data[ $key ] : '';
	}

	/**
	 * Gets the script data from assets php file.
	 *
	 * @return array
	 */
	protected function raw_script_data(): array {
		static $script_data = null;

		if ( is_null( $script_data ) && file_exists( BULKPRODMOV_DIR . 'assets/js/adminpage.min.asset.php' ) ) {
			$script_data = include BULKPRODMOV_DIR . 'assets/js/adminpage.min.asset.php';
		}

		return (array) $script_data;
	}

	/**
	 * Prepares assets.
	 *
	 * @return void
	 */
	public function enqueue_assets() {
		if ( ! empty( $this->page_scripts ) ) {
			foreach ( $this->page_scripts as $handle => $page_script ) {
				wp_register_script(
					$handle,
					$page_script['src'],
					$page_script['deps'],
					$page_script['ver'],
					$page_script['strategy']
				);

				if ( ! empty( $page_script['localize'] ) ) {
					wp_localize_script( $handle, 'bulkprodmovData', $page_script['localize'] );
				}

				wp_enqueue_script( $handle );

				if ( ! empty( $page_script['style_src'] ) ) {
					wp_enqueue_style( $handle, $page_script['style_src'], array(), $this->assets_version );
				}

				wp_set_script_translations( $handle, 'bulk-product-category-mover-for-woocommerce', BULKPRODMOV_LANGUAGES_DIR );
			}
		}
	}

	/**
	 * Prints the wrapper element which React will use as root.
	 *
	 * @return void
	 */
	protected function view() {
		echo '<div id="' . esc_attr( $this->unique_id ) . '"></div>';
	}
}
