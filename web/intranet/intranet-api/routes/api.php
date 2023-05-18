<?php

use App\Exports\ListaAlumnos;
use App\Http\Controllers\CsvController;
use App\Mail\NotificacionAlumnado;
use App\Models\Csv;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\User;
use Maatwebsite\Excel\Facades\Excel;

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

/* Route::post('/logout', [AuthController::class, 'logout']); */

Route::group(['middleware' => ['auth:api', 'role:secretaria,jefatura']], function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/su', function () {
        return 'hola';
    });
    Route::post('/subirCsv', [CsvController::class, 'subirCsv']);
});
Route::group(['middleware' => ['auth:api', 'role:jefatura']], function(){
    Route::get('/su2', function () {
        // Lista de materias según un profesor
        $materias = Csv::where('DESTINO_EMAIL', 'AL2367.ARG@GMAIL.COM')->pluck('MATERIA')->unique();
    
        // Lista de profesores
        $profesores = Csv::pluck('DESTINO_EMAIL')->unique();
        $array = [];
        /* $prof_materia = Csv::where('DESTINO_EMAIL', '=', 'AL2367.ARG@GMAIL.COM')->where('MATERIA', '=', 'FR2')->get();
        return $prof_materia; */
        foreach ($profesores as $profesor){
            $materias = Csv::where('DESTINO_EMAIL', strval($profesor))->pluck('MATERIA')->unique();
            foreach ($materias as $materia){
                $prof_materia = Csv::where('DESTINO_EMAIL', '=', $profesor)->where('MATERIA', '=', $materia)->where('PENDIENTE', '!=', 'p')->orderBy('GRUPO', 'ASC')->get();
                array_push($array, $prof_materia);
                // TODO: Hacer que se cree un excel según cada materia. Recuerda hacer uno para los que no son p y otro para los p
            }
            
        }
        return $array;

        // $listaProf = Csv::pluck('DESTINO_EMAIL')->unique()->where('PENDIENTE', '!=', 'p')->where('MATERIA', '=', 'FR2');
        return $profesores;


        /* foreach($materias as $materia){
            Csv::pluck('DESTINO_EMAIL')->unique()->where('PENDIENTE', '!=', 'p')->where('MATERIA', '=', $materia);
        } */

        dd($materias);
        // Lista de no pendientes
        Csv::pluck('DESTINO_EMAIL')->unique()->where('PENDIENTE', '!=', 'p')->

        /* // Lista de emails
        $mails = Csv::pluck('DESTINO_EMAIL')->unique();
        // Envío de emails
        foreach ($mails as $mail){
            Mail::to($mail)->send(new NotificacionAlumnado((Csv::where('DESTINO_EMAIL', '=', $mail)->first())->DESTINO_NOM));
        } */
        dd($mail);
    });
    Route::get('/exp', function(){
        return Excel::download(new ListaAlumnos, 'prueba.csv');
    });
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