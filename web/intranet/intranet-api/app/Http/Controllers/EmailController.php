<?php

namespace App\Http\Controllers;

use App\Exports\ListaAlumnos;
use App\Models\Csv;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;
use App\Mail\NotificacionAlumnado;
use App\Mail\NotificacionPendiente;

class EmailController extends Controller
{
    public function enviarEmails(Request $request)
    {
        try {
            // Lista de profesores
            $profesores = Csv::where('PENDIENTE', '!=', 'P')->pluck('DESTINO_EMAIL')->unique();
            // Lista de jefes de departamento
            $jefesDep = Csv::where('PENDIENTE', '=', 'P')->pluck('DESTINO_EMAIL')->unique();
            

            // SOLO ESTARÁN LOS PROFESORES, NO AQUELLOS QUE TENGAN EL ROL DE JEF DE DEP
            foreach ($profesores as $profesor) {
                // Lista de materias de un profesor
                $materias = Csv::where('DESTINO_EMAIL', $profesor)->where('PENDIENTE', '!=', 'P')->pluck('MATERIA')->unique();
                foreach ($materias as $materia) {
                    // Lista de alumnos según cada materia
                    $prof_materia = Csv::select("GRUPO", "MATERIA", "APE_ALU", "NOM_ALU", "EMAIL_ALU")->where('PENDIENTE', '!=', 'P')->where('DESTINO_EMAIL', '=', $profesor)->where('MATERIA', '=', $materia)->orderBy('GRUPO', 'ASC')->get();
                    $nombreArchivo = 'alumnos' . '-' . (Csv::where('DESTINO_EMAIL', '=', $profesor)->first()->DESTINO_NOM) . '-' . $materia;
                    // Creación de los pdf y excel
                    Excel::store(new ListaAlumnos($prof_materia), ($nombreArchivo . '.pdf'));
                    Excel::store(new ListaAlumnos($prof_materia), ($nombreArchivo . '.xls'));
                }
                // Después de la creación de los .pdf y los .xls. Envío del email, se le pasa el nombre del profesor y el nombre del archivo
                Mail::to($profesor)->send(new NotificacionAlumnado((Csv::where('DESTINO_EMAIL', '=', $profesor)->first())->DESTINO_NOM, $nombreArchivo));
            }

            // SOLO ESTARÁN LOS JEF DE DEP, NO AQUELLOS QUE TENGAN EL ROL DE PROFESOR
            foreach ($jefesDep as $jefeDep) {
                // Lista de materias de un profesor
                $materias = Csv::where('DESTINO_EMAIL', $jefeDep)->where('PENDIENTE', '=', 'P')->pluck('MATERIA')->unique();
                foreach ($materias as $materia) {
                    // Lista de alumnos según cada materia
                    $jefeDep_materia = Csv::select("GRUPO", "MATERIA", "APE_ALU", "NOM_ALU", "EMAIL_ALU")->where('PENDIENTE', '=', 'P')->where('DESTINO_EMAIL', '=', $jefeDep)->where('MATERIA', '=', $materia)->orderBy('GRUPO', 'ASC')->get();
                    $nombreArchivo = 'alumnos' . '-' . Csv::where('DESTINO_EMAIL', '=', $jefeDep)->first()->DESTINO_NOM . '-' . $materia . '-pendientes';
                    // Creación de los pdf y excel
                    Excel::store(new ListaAlumnos($jefeDep_materia), ($nombreArchivo . '.pdf'));
                    Excel::store(new ListaAlumnos($jefeDep_materia), ($nombreArchivo . '.xls'));
                }
                // Después de la creación de los .pdf y los .xls. Envío del email, se le pasa el nombre del profesor y el nombre del archivo
                Mail::to($jefeDep)->send(new NotificacionPendiente((Csv::where('DESTINO_EMAIL', '=', $jefeDep)->first())->DESTINO_NOM, $nombreArchivo));
            }

            // Eliminar archivos enviados
            $directorio = storage_path('app');
            $archivos = glob($directorio . '/alumnos*');

            foreach ($archivos as $archivo) {
                if (is_file($archivo)) {
                    unlink($archivo);
                }
            }

            return response(['success' => 'Emails mandados exitosamente']);
        } catch (\Exception $e) {
            // Eliminar archivos enviados
            $directorio = storage_path('app');
            $archivos = glob($directorio . '/alumnos*');
            if (isset($archivos)){
                foreach ($archivos as $archivo) {
                    if (is_file($archivo)) {
                        unlink($archivo);
                    }
                }
            }
            return response(['message' => 'Error al enviar emails']);
        }

    }
}