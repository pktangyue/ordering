<?php

class Student_model extends CI_Model {
    private $table_name;
    function __construct() {
        parent::__construct();
        $this->table_name = 'student';
    }
    function insert($data) {
        $this->db->insert($this->table_name, $data);
    }
}
