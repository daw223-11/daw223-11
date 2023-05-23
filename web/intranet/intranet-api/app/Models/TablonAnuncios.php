<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TablonAnuncios extends Model
{
    use HasFactory;
    protected $table = 'tablon_anuncios';
    protected $primaryKey = 'id_tablon_anuncios';
    protected $fillable = [
        'id_tablon_anuncios',
        'nombre',
        'data'
    ];
}
