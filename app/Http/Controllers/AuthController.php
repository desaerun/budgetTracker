<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use GuzzleHttp\Exception\GuzzleException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->username = trim($request->username);
        $request->password = trim($request->password);

        if (empty($request->username)) {
            return response()->json('A username is required.',401);
        }
        if (empty($request->password)) {
            return response()->json('A password is required.',401);
        }

        $http = new \GuzzleHttp\Client;

        try {
            $response = $http->post(
                config('services.passport.login_endpoint'),
                [
                    'form_params' => [
                        'grant_type'    => 'password',
                        'client_id'     => config('services.passport.client_id'),
                        'client_secret' => config('services.passport.client_secret'),
                        'username'      => $request->username,
                        'password'      => $request->password,
                        'scope'         => '*',
                    ]
                ]
            );
            return $response->getBody();
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            switch ($e->getCode()) {
                case '400':
                case '401':
                {
                    return response()->json('Your credentials are incorrect.  Please try again.', $e->getCode());
                }
                default:
                {
                    return response()->json('Something went wrong on the server.', $e->getCode());
                }

            }
        } catch (GuzzleException $e) {
            return response()->json('Guzzle exception.', $e->getMessage());
        }
    }

    public function register(Request $request)
    {
        $request->validate(
            [
                'name'     => ['required', 'string', 'max:255'],
                'email'    => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'string', 'min:8'],
            ]
        );
        return User::create(
            [
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => Hash::make($request->password),
            ]
        );
    }

    public function logout() {
        auth()->user()->tokens->each(function ($token,  $key) {
            $token->revoke();
        });
        return response()->json('Logged out successfully.',200);
    }
}
