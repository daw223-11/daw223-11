<?php

namespace App\Exports;

use App\Models\Csv;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ListaAlumnos implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Csv::all();
    }
    public function headings(): array
    {
        return [
            "id_csv",
            "GRUPO",
            "MATERIA",	
            "APE_ALU",	
            "NOM_ALU",
            "EMAIL_ALU",
            "PENDIENTE",
            "ROL",
            "DESTINO_NOM",
            "DESTINO_EMAIL",
            "created_at",	
            "updated_at"
        ];
    }
}
