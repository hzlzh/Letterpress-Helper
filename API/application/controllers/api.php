<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Api extends CI_Controller
{
	private $_key = array();
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	public function index($param = '', $length = 0)
	{
		if ( ! empty($param) && ($length == 0 OR ($length >= 2 && $length <=21)))
		{
			$len_param = strlen($param);
			$tmp_words = array();
			$split_param = str_split($param);

			if ($length == 0)
			{
				$param_arr = str_split($param);
				asort($param_arr);
				foreach ($param_arr as $k => $v)
				{
					if ($v == 'a' OR $v == 'e' OR $v == 'i' OR $v == 'o' OR $v == 'u')
					{
						$arr[] = $v;
					}
				}

				$t = microtime();

				$this->_comb_1($arr);

				$t2 = microtime();
				echo $t2 -  $t;

				$this->_key[] = '000';

				$this->load->helper('directory');
				$this->load->helper('file');
				$dir = './upload_str/';
				$map = directory_map($dir);
				$str = '';

				foreach ($map as $k => $v)
				{
					if (in_array($v, $this->_key) && ! empty($v))
					{
						$str .= file_get_contents($dir.$v);
					}
				}

				$words = explode(",", $str);

				foreach ($words as $word)
				{
					if ($this->_compare_str(str_split($word), $split_param) === TRUE)
					{
						$tmp_words[] = $word;
					}
				}
			}
			elseif ($length > 0)
			{
				$words = $this->_get_words_db($length);

				foreach ($words as $k => $word)
				{
					if ($this->_compare_str(str_split($word), $split_param) === TRUE)
					{
						$tmp_words[] = $word;
					}
				}
			}
			$jsoncallback = $this->input->get('jsoncallback');

			if ( ! empty($jsoncallback))
			{
				echo $jsoncallback.'('.json_encode($tmp_words).')';
			}
			else
			{
				echo json_encode($tmp_words);
			}
		}
	}

	private function _get_words_db($length = 0)
	{

		$this->db->select('*');
		$this->db->from('word_'.$length);

		$query		= $this->db->get();
		$result		= $query->result_array();

		$rst = array();
		foreach ($result as $k => $v)
		{
			$rst[] = $v['word_name'];
		}
		return $rst;
	}

	private function _compare_str($arr1, $arr2)
	{
		foreach ($arr1 as $k => $v)
		{
			if (in_array($v, $arr2))
			{
				foreach ($arr2 as $k1 => $v1)
				{
					if ($v1 == $v)
					{
						unset($arr2[$k1]);
						break;
					}
				}
			}
			else
			{
				return FALSE;
			}
		}
		return TRUE;
	}

	private function _comb_1($arr)
	{
		for ($i = 1; $i <= count($arr); $i++)
		{
			$this->_comb_2($arr, '', $i);
		}
	}

	private function _comb_2($arr, $head = '', $n)
	{
		if ($n > 1)
		{
			foreach ($arr as $k => $v)
			{
				array_shift($arr);
				if (count($arr) >= $n - 1)
				{
					$this->_comb_2($arr, $head.$v, $n - 1);
				}
			}
		}
		elseif ($n == 1)
		{
			foreach ($arr as $v)
			{
				if ( ! in_array($head.$v, $this->_key))
				{
					$this->_key[] = $head.$v;
				}
			}
		}
	}
}