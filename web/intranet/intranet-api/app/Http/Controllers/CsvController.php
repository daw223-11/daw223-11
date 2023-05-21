<?php

namespace App\Http\Controllers;

use App\Models\Csv;
use Illuminate\Http\Request;

class CsvController extends Controller
{
    // TODO: subirCSV() -> Comprobar que ese csv está vacío

    public function subirCsv(Request $request)
    {

        try {
            $validatedData = $request->validate([
                'file' => 'required',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e){
            return response(['message' => 'Error, petición no válida'], 403);
        }
        // Obtiene el csv
        $lines = explode("\n", $request->file);
        $array = array_map('str_getcsv', $lines);
        $csvFile = base64_decode($array[0][1]);
        $csvFile = mb_convert_encoding($csvFile, 'UTF-8', 'ISO-8859-15');
        /* $csvFile = mb_convert_encoding($csvFile, 'UTF-8', 'ISO-8859-1'); */
        $realLines = explode("\n", $csvFile);
        
        // Si la base de datos tiene información se elimina toda la información
        if (!(Csv::count() == 0)){
            Csv::truncate();
        }

        foreach($realLines as $line){
            $lineM = strtoupper($line);
            $lineMS = str_replace('"', "", $lineM);
            $data = explode(',', $lineMS);
            try {
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
            } catch (\Exception $e){
                return response(['message' => 'Error en la carga del csv'], 400);
            }
        }


        return response(['success' => 'Archivo cargado satisfactoriamente']);

    }
    // TODO: bajarCSVMatriculaciones() -> Descarga el csv de las matrículaciones que han ocurrido
    
}
