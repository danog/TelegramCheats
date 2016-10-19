<?php
ini_set('log_errors', 1);
ini_set('error_log', '/tmp/php-error-proxy.log');
if (!isset($_REQUEST["url"]) || $_REQUEST["url"] == "") {
	die("No URL was provided");
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	die("This isn't a POST request");
}

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $_REQUEST["url"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt($ch, CURLOPT_POST,           1 );
curl_setopt($ch, CURLOPT_POSTFIELDS,     file_get_contents('php://input'));
curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: text/plain'));

curl_setopt( $ch, CURLOPT_HEADER, true );	   // enabled response headers

$response = preg_replace("/^HTTP\/1.1 100 Continue(\r\n){2}/", '', curl_exec($ch));

// split response to header and content

list($response_headers, $response_content) = preg_split('/(\r\n){2}/', $response, 2);

// (re-)send the headers

$response_headers = preg_split('/(\r\n){1}/', $response_headers);

foreach ($response_headers as $key => $response_header) {
    if (!preg_match('/^(Transfer-Encoding):/', $response_header) && !preg_match('/^Content-Length:/', $response_header)) {
        header($response_header, false);
    }
}
// finally, output the content
exit($response_content);
