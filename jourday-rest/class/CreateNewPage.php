<?php
/**
 * Created by PhpStorm.
 * User: mike
 * Date: 31.01.18
 * Time: 18:56
 */

/**
 * Class CreateNewPage
 * @desc programmatically create some basic pages, and then set Home and Blog
 */
class CreateNewPage
{
    protected $pageName = 'Page Name placeholder';

    protected $pageTitle = 'Page Title placeholder';

    protected $pageContent = 'This is blog page placeholder. Anything you enter here will not
     appear in the front end, except for search results pages.';

    /**
     * @desc create page
     */
    public function create()
    {
        if (is_admin()) {
            $pageCheck = get_page_by_title($this->pageTitle);
            $page = array(
                'post_type' => 'page',
                'post_title' => $this->pageTitle,
                'post_content' => $this->pageContent,
                'post_status' => 'publish',
                'post_author' => 1,
                'post_slug' => $this->slugify($this->pageName),
                'post_name' => $this->slugify($this->pageName)
            );
            if (!isset($pageCheck->ID) && !$this->slugExists($this->slugify($this->pageName))){
                $post = wp_insert_post($page);
                return $post;
            }
        }
        return null;
    }

    /**
     * @return array|bool|false|null|WP_Post
     */
    public function delete()
    {
        $pageCheck = get_page_by_title($this->pageTitle);
        if (isset($pageCheck->ID)) {
            return wp_delete_post($pageCheck->ID, true);
        }
        return false;
    }
    /**
     * @desc setup a function to check if these pages exist
     *
     * @param $post_name
     * @return bool
     */
    public function slugExists($post_name) {
        global $wpdb;
        if ($wpdb->get_row("SELECT post_name FROM wp_posts WHERE post_name = '" . $post_name . "'", 'ARRAY_A')) {
            return true;
        }
        return false;
    }

    /**
     * @param $text
     * @return null|string|string[]
     */
    public function slugify($text)
    {
        // replace non letter or digits by -
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);

        // transliterate
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

        // remove unwanted characters
        $text = preg_replace('~[^-\w]+~', '', $text);

        // trim
        $text = trim($text, '-');

        // remove duplicate -
        $text = preg_replace('~-+~', '-', $text);

        // lowercase
        $text = strtolower($text);

        if (empty($text)) {
            return 'n-a';
        }

        return $text;
    }

    /**
     * @return string
     */
    public function getPageName()
    {
        return $this->pageName;
    }

    /**
     * @param string $pageName
     */
    public function setPageName($pageName)
    {
        $this->pageName = $pageName;
    }

    /**
     * @return mixed
     */
    public function getPageTitle()
    {
        return $this->pageTitle;
    }

    /**
     * @param mixed $pageTitle
     */
    public function setPageTitle($pageTitle)
    {
        $this->pageTitle = $pageTitle;
    }

    /**
     * @return string
     */
    public function getPageContent()
    {
        return $this->pageContent;
    }

    /**
     * @param string $pageContent
     */
    public function setPageContent($pageContent)
    {
        $this->pageContent = $pageContent;
    }
}