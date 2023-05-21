<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Elementor oEmbed Widget.
 *
 * Elementor widget that inserts an embbedable content into the page, from any given URL.
 *
 * @since 1.0.0
 */
class Elementor_oEmbed_Widget extends \Elementor\Widget_Base {

	/**
	 * Get widget name.
	 *
	 * Retrieve oEmbed widget name.
	 *
	 * @since 1.0.0
	 * @access public
	 * @return string Widget name.
	 */
	public function get_name() {
		return 'oembed';
	}

	/**
	 * Get widget title.
	 *
	 * Retrieve oEmbed widget title.
	 *
	 * @since 1.0.0
	 * @access public
	 * @return string Widget title.
	 */
	public function get_title() {
		return esc_html__( 'oEmbed', 'elementor-oembed-widget' );
	}

	/**
	 * Get widget icon.
	 *
	 * Retrieve oEmbed widget icon.
	 *
	 * @since 1.0.0
	 * @access public
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return 'eicon-code';
	}

	/**
	 * Get custom help URL.
	 *
	 * Retrieve a URL where the user can get more information about the widget.
	 *
	 * @since 1.0.0
	 * @access public
	 * @return string Widget help URL.
	 */
	public function get_custom_help_url() {
		return 'https://developers.elementor.com/docs/widgets/';
	}

	/**
	 * Get widget categories.
	 *
	 * Retrieve the list of categories the oEmbed widget belongs to.
	 *
	 * @since 1.0.0
	 * @access public
	 * @return array Widget categories.
	 */
	public function get_categories() {
		return [ 'general' ];
	}

	/**
	 * Get widget keywords.
	 *
	 * Retrieve the list of keywords the oEmbed widget belongs to.
	 *
	 * @since 1.0.0
	 * @access public
	 * @return array Widget keywords.
	 */
	public function get_keywords() {
		return [ 'oembed', 'url', 'link' ];
	}

	/**
	 * Register oEmbed widget controls.
	 *
	 * Add input fields to allow the user to customize the widget settings.
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	 protected function _register_controls() {
        $this->start_controls_section(
            'content_section',
            [
                'label' => 'Contenido',
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'tab1_title',
            [
                'label' => 'Título Pestaña 1',
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => 'Pestaña 1',
            ]
        );

        $this->add_control(
            'tab1_content',
            [
                'label' => 'Contenido Pestaña 1',
                'type' => \Elementor\Controls_Manager::WYSIWYG,
                'default' => '<p>Contenido de la pestaña 1</p>',
            ]
        );

        $this->add_control(
            'tab2_title',
            [
                'label' => 'Título Pestaña 2',
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => 'Pestaña 2',
            ]
        );

        $this->add_control(
            'tab2_content',
            [
                'label' => 'Contenido Pestaña 2',
                'type' => \Elementor\Controls_Manager::WYSIWYG,
                'default' => '<p>Contenido de la pestaña 2</p>',
            ]
        );

        $this->add_control(
            'tab3_title',
            [
                'label' => 'Título Pestaña 3',
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => 'Pestaña 3',
            ]
        );

        $this->add_control(
            'tab3_content',
            [
                'label' => 'Contenido Pestaña 3',
                'type' => \Elementor\Controls_Manager::WYSIWYG,
                'default' => '<p>Contenido de la pestaña 3</p>',
            ]
        );

        $this->end_controls_section();
    }
	/**
	 * Render oEmbed widget output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	protected function render() {
        $settings = $this->get_settings_for_display();

        ?>
        <div class="custom-widget">
            <ul class="tabs">
                <li><a href="#tab1"><?php echo $settings['tab1_title']; ?></a></li>
                <li><a href="#tab2"><?php echo $settings['tab2_title']; ?></a></li>
                <li><a href="#tab3"><?php echo $settings['tab3_title']; ?></a></li>
            </ul>

            <div id="tab1" class="tab-content"><?php echo $settings['tab1_content']; ?></div>
            <div id="tab2" class="tab-content"><?php echo $settings['tab2_content']; ?></div>
            <div id="tab3" class="tab-content"><?php echo $settings['tab3_content']; ?></div>
        </div>
        <?php
    }

    // Renderizar la vista previa del widget en el editor de Elementor
    protected function _content_template() {
        ?>

        <div class="custom-widget">
            <ul class="tabs">
                <li><a href="#tab1"><?php echo 'Pestaña 1'; ?></a></li>
                <li><a href="#tab2"><?php echo 'Pestaña 2'; ?></a></li>
                <li><a href="#tab3"><?php echo 'Pestaña 3'; ?></a></li>
            </ul>

            <div id="tab1" class="tab-content"><?php echo 'Contenido de la pestaña 1'; ?></div>
            <div id="tab2" class="tab-content"><?php echo 'Contenido de la pestaña 2'; ?></div>
            <div id="tab3" class="tab-content"><?php echo 'Contenido de la pestaña 3'; ?></div>
        </div>

        <?php
    }
	

}
