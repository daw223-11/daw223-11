<?php

namespace App\Http\Controllers;

use App\Models\TablonAnuncios;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TablonAnunciosController extends Controller
{
    /**
     * Función de la api para traer el tablón de anuncios
     *
     * @param Request $request
     * @param TablonAnuncios $tablonAnuncios
     * @return Response
     */
    public function obtenerTablonAnuncios(Request $request, TablonAnuncios $tablonAnuncios)
    {
        try {
            return response([
                'success' => 'Tablón cargado correctamente',
                'data' => $tablonAnuncios->data
            ]);
        } catch (\Exception $e) {
            return response([
                'message' => 'Error en la carga del tablón'
            ]);
        }
    }

    /**
     * Función de la api para actualizar el tablón de anuncios
     *
     * @param Request $request
     * @param TablonAnuncios $tablonAnuncios
     * @return Response
     */
    public function actualizarTablonAnuncios(Request $request, TablonAnuncios $tablonAnuncios)
    {
        try {
            $tablonAnuncios->data = $request->data;
            $tablonAnuncios->save();
            return response([
                'success' => 'Tablón de anuncios actualizado',
            ]);
        } catch (\Exception $e) {
            return response([
                'message' => 'Error en la actualización del tablón de anuncios'
            ]);
        }
    }
}