<?php

use App\Exports\ListaAlumnos;
use App\Http\Controllers\CsvController;
use App\Mail\NotificacionAlumnado;
use App\Mail\NotificacionPendiente;
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
        // Lista de profesores
        $profesores = Csv::where('PENDIENTE', '!=', 'P')->pluck('DESTINO_EMAIL')->unique();
        // Lista de jefes de departamento
        $jefesDep = Csv::where('PENDIENTE', '=', 'P')->pluck('DESTINO_EMAIL')->unique();
        
        // SOLO ESTARÁN LOS JEF DE DEP, NO AQUELLOS QUE TENGAN EL ROL DE PROFESOR
        foreach ($jefesDep as $jefeDep){
            // Lista de materias de un profesor
            $materias = Csv::where('DESTINO_EMAIL', $jefeDep)->where('PENDIENTE', '=', 'P')->pluck('MATERIA')->unique();
            foreach ($materias as $materia){
                // Lista de alumnos según cada materia
                $jefeDep_materia = Csv::select("GRUPO", "MATERIA", "APE_ALU", "NOM_ALU", "EMAIL_ALU")->where('PENDIENTE', '=', 'P')->where('DESTINO_EMAIL', '=', $jefeDep)->where('MATERIA', '=', $materia)->orderBy('GRUPO', 'ASC')->get();
                $nombreArchivo = 'alumnos'.'-'.Csv::where('DESTINO_EMAIL', '=', $jefeDep)->first()->DESTINO_NOM.'-'.$materia.'-pendientes';
                // Creación de los pdf y excel
                Excel::store(new ListaAlumnos($jefeDep_materia), ($nombreArchivo.'.pdf'));
                Excel::store(new ListaAlumnos($jefeDep_materia), ($nombreArchivo.'.xls'));
                // TODO: Hacer que se cree un excel según cada materia. Recuerda hacer uno para los que no son p y otro para los p
            }
            Mail::to($jefeDep)->send(new NotificacionPendiente((Csv::where('DESTINO_EMAIL', '=', $jefeDep)->first())->DESTINO_NOM, $nombreArchivo));
        }

        // SOLO ESTARÁN LOS PROFESORES, NO AQUELLOS QUE TENGAN EL ROL DE JEF DE DEP
        foreach ($profesores as $profesor){
            // Lista de materias de un profesor
            $materias = Csv::where('DESTINO_EMAIL', $profesor)->where('PENDIENTE', '!=', 'P')->pluck('MATERIA')->unique();
            foreach ($materias as $materia){
                // Lista de alumnos según cada materia
                $prof_materia = Csv::select("GRUPO", "MATERIA", "APE_ALU", "NOM_ALU", "EMAIL_ALU")->where('PENDIENTE', '!=', 'P')->where('DESTINO_EMAIL', '=', $profesor)->where('MATERIA', '=', $materia)->orderBy('GRUPO', 'ASC')->get();
                $nombreArchivo = 'alumnos'.'-'.(Csv::where('DESTINO_EMAIL', '=', $profesor)->first()->DESTINO_NOM).'-'.$materia;
                // Creación de los pdf y excel
                Excel::store(new ListaAlumnos($prof_materia), ($nombreArchivo.'.pdf'));
                Excel::store(new ListaAlumnos($prof_materia), ($nombreArchivo.'.xls'));
                // TODO: Hacer que se cree un excel según cada materia. Recuerda hacer uno para los que no son p y otro para los p
            }
            Mail::to($profesor)->send(new NotificacionAlumnado((Csv::where('DESTINO_EMAIL', '=', $profesor)->first())->DESTINO_NOM, $nombreArchivo));
        }
        
        
        
        return 'trata de funcionar';

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