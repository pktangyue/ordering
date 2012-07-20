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
    function is_number_exists($number) {
        $this->db->from($this->table_name)->where('number', $number);
        return $this->db->count_all_results() == 0 ? False : True;
    }
}
