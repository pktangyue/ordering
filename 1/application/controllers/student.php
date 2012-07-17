<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Student extends CI_Controller {
    public function index() {
        $this->parser->parse('/student.html', array(
            'title' => 'student manage'
        ));
    }
}
