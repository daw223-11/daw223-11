<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Csv extends Model
{
    use HasFactory;

    protected $table = 'csvs';
    protected $primaryKey = 'id_csv';
    protected $fillable =[
        'id_csv',
        "GRUPO",
        "MATERIA",
        "APE_ALU",
        "NOM_ALU",
        "EMAIL_ALU",
        "PENDIENTE",
        "ROL",
        "DESTINO_NOM",
        "DESTINO_EMAIL"
    ];
}
