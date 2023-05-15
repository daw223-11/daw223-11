<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('csvs', function (Blueprint $table) {
            $table->bigIncrements('id_csv');
            $table->string("GRUPO");
            $table->string("MATERIA");
            $table->string("APE_ALU");
            $table->string("NOM_ALU");
            $table->string("EMAIL_ALU");
            $table->string("PENDIENTE");
            $table->string("ROL");	
            $table->string("DESTINO_NOM");
            $table->string("DESTINO_EMAIL");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('csvs');
    }
};
