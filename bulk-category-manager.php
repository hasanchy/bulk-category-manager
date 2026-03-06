<?php
/**
 * Main file for WordPress.
 *
 * @wordpress-plugin
 * Plugin Name:     Bulk Category Manager for WooCommerce
 * Plugin URI:      https://woocommerce.com/products/bulk-category-manager/
 * Description:     Manage product categories in bulk for WooCommerce, with batch processing and progress UI.
 * Author:          ThemeDyno
 * Author URI:      https://themedyno.io/
 * Version:         1.0.0
 * Text Domain:     bulk-category-manager
 * Domain Path:     /languages
 * Requires Plugins: woocommerce
 *
 * Requires at least: 5.2
 * Tested up to: 6.9.1
 * Requires PHP: 7.2.0
 * WC requires at least: 7.9
 * WC tested up to: 10.5.2
 *
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

// Avoid direct file request
defined( 'ABSPATH' ) || die( 'No direct access allowed!' );

// Support for site-level autoloading.
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';
}

// Define constants
define( 'BULKCATMAN_VERSION', '1.0.0' );
define( 'BULKCATMAN_PLUGIN_FILE', __FILE__ );
define( 'BULKCATMAN_DIR', plugin_dir_path( __FILE__ ) );
define( 'BULKCATMAN_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
define( 'BULKCATMAN_LANGUAGES_DIR', BULKCATMAN_DIR . '/languages' );
define( 'BULKCATMAN_URL', plugin_dir_url( __FILE__ ) );
define( 'BULKCATMAN_ASSETS_URL', BULKCATMAN_URL . '/assets' );

/**
 * BULKCATMAN_BulkCategoryManagerHandler class.
 */
class BULKCATMAN_BulkCategoryManagerHandler {

	/**
	 * Holds the class instance.
	 *
	 * @var BULKCATMAN_BulkCategoryManagerHandler $instance
	 */
	private static $instance = null;

	/**
	 * Return an instance of the class
	 *
	 * @return BULKCATMAN_BulkCategoryManagerHandler class instance.
	 * @since 1.0.0
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Class constructor.
	 */
	private function __construct() {
		add_action( 'plugins_loaded', array( $this, 'check_woocommerce' ), 5 ); // Run early to check WooCommerce
		add_action( 'plugins_loaded', array( $this, 'load' ) );
		if ( get_transient( 'bulkcatman_activation_redirect' ) ) {
			add_action( 'admin_init', array( $this, 'redirect_after_activation' ) );
		}
	}

	/**
	 * Check if WooCommerce is active.
	 */
	public function check_woocommerce() {
		if ( ! class_exists( 'WooCommerce' ) ) {
			add_action(
				'admin_notices',
				function () {
					echo '<div class="error"><p>' . esc_html__( 'Bulk Category Manager for WooCommerce requires WooCommerce to be installed and activated.', 'bulk-category-manager' ) . '</p></div>';
				}
			);
			return;
		}
	}

	/**
	 * Class initializer.
	 */
	public function load() {
		BULKCATMAN\Core\Loader::instance();
	}

	/**
	 * Redirect function after activation.
	 */
	public function redirect_after_activation() {
		if ( get_transient( 'bulkcatman_activation_redirect' ) ) {
			delete_transient( 'bulkcatman_activation_redirect' );
			wp_safe_redirect( admin_url( 'edit.php?post_type=product&page=bulk-category-manager-admin' ) );
			exit;
		}
	}
}

add_action(
	'before_woocommerce_init',
	function () {
		if ( class_exists( '\Automattic\WooCommerce\Utilities\FeaturesUtil' ) ) {
			\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__, true );
		}
	}
);

// Init the plugin and load the plugin instance
BULKCATMAN_BulkCategoryManagerHandler::get_instance();
