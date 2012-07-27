<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Student extends CI_Controller {
    private $per_page = 10;
    public function __construct() {
        parent::__construct();
        $this->load->model('student_model');
        $this->load->model('region_model');
    }
    public function index() {
        $provinces = $this->region_model->get_provinces();
        $this->parser->parse('/student.html', array(
            'title' => 'student manage',
            'provinces' => $provinces,
        ));
    }
    public function get_items() {
        echo json_encode($this->student_model->get_list());
    }
    public function add() {
        if (!$this->input->is_ajax_request()) {
            return;
        }
        $data = json_decode(file_get_contents('php://input'));
        if (!preg_match('/^\d+$/', $data->number)) {
            echo 'error number';
            return;
        }
        echo json_encode($this->student_model->insert($data));
    }
    public function delete($id) {
        echo json_encode($this->student_model->delete($id));
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