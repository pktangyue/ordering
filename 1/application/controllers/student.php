<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Student extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model('student_model');
        $this->load->model('region_model');
    }
    public function index() {
        $provinces = $this->region_model->get_provinces();
        $this->parser->parse('/student.html', array(
            'title' => 'student manage',
            'provinces' => $provinces
        ));
    }
    public function add() {
        if (!$this->input->is_ajax_request()) {
            return;
        }
        $data = json_decode(file_get_contents('php://input'));
        $this->student_model->insert($data);
    }
    public function get_cities($province_id) {
        echo json_encode(array(
            'cities' => $this->region_model->get_cities_by_id($province_id)
        ));
    }
    public function check_number($number) {
        echo $this->student_model->is_number_exists($number);
    }
}
