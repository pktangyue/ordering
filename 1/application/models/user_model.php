<?php

class User_model extends CI_Model {
    function __construct() {
        parent::__construct();
    }
    function check_admin($user_name, $password) {
        $this->load->helper('security');
        $this->db->where(array(
            'user_name' => $user_name,
            'password' => do_hash($password, 'md5') ,
            'is_admin' => 1
        ));
        $this->db->from('user');
        return $this->db->count_all_results() == 0 ? False : True;
    }
}
