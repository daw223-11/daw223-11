<?php

namespace App\Http\Controllers;

use App\Models\Csv;
use Illuminate\Http\Request;

class CsvController extends Controller
{
    // TODO: subirCSV() -> Antes de subir el csv eliminará el anterior, luego lo importará a la bbdd 

    public function subirCsv(Request $request)
    {

        try {
            $validatedData = $request->validate([
                'file' => 'required|mimes:csv,txt|max:4096',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e){
            return response(['message' => 'Error, petición no válida'], 403);
        }
        // Obtiene el csv
        $csvFile = $request->file('file');

        /* $csvFile = $request->file('file'); */
        /* if ($csvFile->getContent() == ""){
            return response([ 'message' => 'CSV inválido'], '403');
        } */
        
        
        // Si la base de datos tiene información se elimina toda la información
        if (!(Csv::count() == 0)){
            Csv::truncate();
        }
        // Si el csv está vació o se envía otro retorna un error
        /* if (!$csvFile) {
            return response([ 'message' => 'CSV inválido'], '403');
        } */

        $file = new \SplFileObject($csvFile);
        

        while (!$file->eof()) {
            // Divide la fila en columnas
            $data = $file->fgetcsv();

            // Crea una instancia del modelo Csv y asigna los valores de cada columna
            $csv = Csv::create([
                "GRUPO" => $data[0],
                "MATERIA" => $data[1],
                "APE_ALU" => $data[2],
                "NOM_ALU" => $data[3],
                "EMAIL_ALU" => $data[4],
                "PENDIENTE" => $data[5],
                "ROL" => $data[6],
                "DESTINO_NOM" => $data[7],
                "DESTINO_EMAIL" => $data[8]
            ]);
        }

        return response(['success' => 'Archivo cargado satisfactoriamente']);

    }
    // TODO: bajarCSVMatriculaciones() -> Descarga el csv de las matrículaciones que han ocurrido
    
}
