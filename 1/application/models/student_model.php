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
    function get_list() {
        $this->db->select(array(
            'number',
            'name',
            'if(gender,"male","female") as gender',
            'school',
            'major',
            'birthday',
            '(select name from region where id = province_id) as province',
            '(select name from region where id = city_id) as city',
            'profile'
        ) , false);
        $query = $this->db->get($this->table_name);
        return $query->result();
    }
    function get_count() {
        $this->db->from($this->table_name);
        return $this->db->count_all_results();
    }
}
