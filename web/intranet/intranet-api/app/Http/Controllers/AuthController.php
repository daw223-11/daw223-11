<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    //

    public function login (Request $request) {
        $validatedData = $request->validate([
            'username' => 'required|max:255',
            'password' => 'required|max:255'
        ]);

        if (!Auth::attempt($validatedData)){
            return response(['message' => 'Usuario y/o contraseña incorrectos']);
        }

        $accessToken = auth()->user()->createToken('authToken')->accessToken;
        return response(['user' => auth()->user(), 'token' => $accessToken]);
    }


    public function register(Request $request) {
        $validatedData = $request->validate([
            'username' => 'required|max:255',
            'password' => 'required|max:255',
            'email' => 'required|max:255',
            'name' => 'required|max:255',
            'lastname1' => 'required|max:255',
            'id_rol' => 'required|max:255'
        ]);


        $validatedData['password'] =  Hash::make($request->password);
        /* return $validatedData; */
        $user = User::create($validatedData);
        $accessToken = $user->createToken('authToken')->accessToken;
        return response([ "user" => $user, "token" => $accessToken]);
        // $user = User::create($input);
    }


    public function logout(Request $request){

        if ($request->user()) {
            $request->user()->tokens()->delete();
        }
    
        $data['success'] = 1;
        $data['message'] = "Logged out successfully.";
        return response()->json($data, '200');

    }

}
