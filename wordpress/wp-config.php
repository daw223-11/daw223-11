<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp-julianmarias' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', '172.24.0.2' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'e]o^vSuV!KQJ~3LQ&$v6n3PQw8h@OHAuGPXS~iLl1{rj5eHH$.9E69N$Ln9 ycG+' );
define( 'SECURE_AUTH_KEY',  '@Ugul~k_2X#:)TC5zAdbFE$8stXd6Cm~W6?CWQR+p;YQ&LWT_D5]YUs}xYMgV{/n' );
define( 'LOGGED_IN_KEY',    '0Au$~`iuE5;GqF$:J$(|bD7]wCkX0DdkMz2R6As@p3dp2z(jTB8XQZ?]9-LAy0mF' );
define( 'NONCE_KEY',        'hq]&abQ7mg)y]nWbDAn-8<l9_wONrW[oNj4NFL[fmZk6h6JvM7g&6E]gnc2D&Wa(' );
define( 'AUTH_SALT',        'ssGM7(I>}Sn3/mp&@p?- <ZjKm8il27hA-V(CEks)pUb)Ckpo|p2w{ e9|<vaGu*' );
define( 'SECURE_AUTH_SALT', 'A,kv]>qbCw2/C+JRM:[k_zY9stm6<0X{RX7[&oZokkw}(A*@5Oqv2KH4nr_g.nsI' );
define( 'LOGGED_IN_SALT',   ' 0bk6pW.4qVoub25x_MCh|<.e g&,v}TNdB[kX7Xg]ue_tyuM=3mQ ~XZ$mif!g&' );
define( 'NONCE_SALT',       'IAdPsDPy+DQVJ~Yevq]fI1if#jqWe a2q&Fr_RTa8Y[8r>@-;Pvu+4zYTC80X`}x' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';



/**
 * wp ignore ftp
 */
define('FS_METHOD','direct');


/**
 * wp upload size
*/
@ini_set('upload_max_size' , '256M' );
