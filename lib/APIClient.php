<?php
class APIClient {
    private $baseURL;

    /**
     * @param string $baseURL
     */
    public function __construct()
    {
        $this->baseURL = 'https://223.26.185.5';
    }


    public function sendRequest($resource, $method = 'GET', $data = []) {
        $ch = curl_init();

        $url = $this->baseURL . $resource;

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_TIMEOUT, 2);

        $headers = [
            'Content-Type: application/x-www-form-urlencoded; charset:utf-8',
            'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
        ];

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        if ($method !== 'GET') {
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        }

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        curl_close($ch);

//        $response = utf8_encode($response);

        return json_decode($response);
    }
}