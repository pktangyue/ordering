<?php

class Student_model extends CI_Model {
    private $table_name;
    private $table_columns;
    function __construct() {
        parent::__construct();
        $this->table_name = 'student';
        $this->table_columns = array(
            'id',
            'number',
            'name',
            'gender',
            'if(gender,"male","female") as gender_display',
            'school',
            'major',
            'birthday',
            '(select name from region where id = province_id) as province',
            'province_id',
            '(select name from region where id = city_id) as city',
            'city_id',
            'profile'
        );
    }
    function insert($data) {
        $this->db->insert($this->table_name, $data);
        $this->db->select($this->table_columns, false)->from($this->table_name)->where('id = last_insert_id()');
        $query = $this->db->get();
        $result = $query->result();
        return $result[0];
    }
    function delete($id) {
        $this->db->delete($this->table_name, array(
            'id' => $id
        ));
    }
    function is_number_exists($number) {
        $this->db->from($this->table_name)->where('number', $number);
        return $this->db->count_all_results() == 0 ? False : True;
    }
    function get_list() {
        $this->db->select($this->table_columns, false);
        $query = $this->db->get($this->table_name);
        return $query->result();
    }
    function get_count() {
        $this->db->from($this->table_name);
        return $this->db->count_all_results();
    }
}
