<?php

namespace App\Responses;

class CommonResponse
{
    public static function send($data = null, $message = null, $status = 200)
    {
        $response = [
            'message' => $message,
            'meta' => [
                'status' => $status,
            ],
        ];

        if ($data) {
            $response['data'] = $data;
        }

        return response()->json($response, $status);
    }

    public static function success($data = null, $message = null, $status = 200)
    {
        return self::send($data, $message, $status);
    }

    public static function error($data = null, $message = null, $status = 400)
    {
        return self::send($data, $message, $status);
    }

    public static function notFound($message = null)
    {
        return self::error($message, 404);
    }
}
