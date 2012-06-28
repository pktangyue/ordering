<?php

class Admin extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->library('session');
        $this->load->helper('url');
    }
    public function index() {
        if ($this->input->post('submit') != 'login') {
            if ($this->session->userdata('user_name')) {
                $this->parser->parse('/admin/index', array(
                    'user_name' => $this->session->userdata('user_name')
                ));
            }
            else {
                $this->parser->parse('/admin/login', array());
            }
        }
        else {
            $user_name = $this->input->post('user_name');
            $password  = $this->input->post('password');
            $this->load->model('user_model');
            if ($this->user_model->check_admin($user_name, $password)) {
                $this->session->set_userdata(array(
                    'user_name'              => $user_name
                ));
                $redirect_url = urldecode($this->input->get('redirect_url'));
                if ($redirect_url) {
                    redirect($redirect_url);
                }
                else {
                    $this->parser->parse('/admin/index', array(
                        'user_name' => $this->session->userdata('user_name')
                    ));
                }
            }
            else {
                echo 'failed';
            }
        }
    }
    public function logout() {
        $this->session->sess_destroy();
        redirect('/admin');
    }
    public function add() {
        if (!$this->session->userdata('user_name')) {
            redirect('/admin?redirect_url=' . urlencode(current_url()));
        }
        echo '<p><a href="/admin/logout">注销</a></p>';
    }
}
