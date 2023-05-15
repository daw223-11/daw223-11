<?php

use App\Http\Controllers\CsvController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\User;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::group(['middleware' => ['auth:api', 'role:secretaria,jefatura']], function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/su', function () {
        return 'hola';
    });
    Route::post('/subirCsv', [CsvController::class, 'subirCsv']);
    
});

/* Route::group(['middleware' => ['role:jefatura']], function () {
    // aquí van las rutas que requieren autenticación y permisos de administrador
    
}); */

/* Route::get('/pruebas', function(Request $request){
    $user = $request->user()->rol->nombre;
    User::where('id', '=', 4)->first();
    return $user;
    dd($user->rol); 
}); */

/* Route::get('/admin', function () {
    return 'hola';
})->middleware('auth', 'role:admin'); */



/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
 */

?>