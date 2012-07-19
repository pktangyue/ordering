<?php

class Region_model extends CI_Model {
    private $table_name;
    function __construct() {
        parent::__construct();
        $this->table_name = 'region';
    }
    function get_provinces() {
        $query            = $this->db->get_where($this->table_name, array(
            'parent_id' => 0
        ));
        return $query->result();
    }
    function get_cities_by_id($province_id) {
        $query = $this->db->get_where($this->table_name, array(
            'parent_id' => $province_id
        ));
        return $query->result();
    }
}
