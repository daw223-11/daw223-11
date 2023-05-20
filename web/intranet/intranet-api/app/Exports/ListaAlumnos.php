<?php

namespace App\Exports;

use App\Models\Csv;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ListaAlumnos implements FromCollection, WithHeadings
{

    public $listaAlumnos;
    public function __construct($listaAlumnos)
    {
        $this->listaAlumnos = $listaAlumnos;
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->listaAlumnos;
        /* return Csv::all(); */
    }
    public function headings(): array
    {
        return [
            "GRUPO",
            "MATERIA",	
            "APE_ALU",	
            "NOM_ALU",
            "EMAIL_ALU",
        ];
    }
}
