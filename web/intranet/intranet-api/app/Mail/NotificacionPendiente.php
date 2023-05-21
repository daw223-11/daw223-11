<?php

namespace App\Mail;

use App\Models\Csv;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NotificacionPendiente extends Mailable
{
    use Queueable, SerializesModels;

    public $nombreProfesor;
    public $nombreArchivo;
    /**
     * Create a new message instance.
     */
    public function __construct($nombreProfesor, $nombreArchivo)
    {
        $this->nombreProfesor = $nombreProfesor;
        $this->nombreArchivo = $nombreArchivo;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Lista de alumnado',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'email',
        );
    }
    // TODO: Crear archivo csv con la lista de alumnos según la asignatura. Aquellos que tienen p son enviados al jefe de departamento
    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $arrayAttachment = [];
        $dir = storage_path("app");
        $archivos = glob($dir . '/*');
        foreach ($archivos as $archivo) {
            $dirArchivo = basename($archivo);
            if (substr($dirArchivo, 0, 7) == 'alumnos'){
                $arrayDirArchivo = explode('-', $dirArchivo);
                // Comprobar si es pendiente
                if (isset($arrayDirArchivo[3])){
                    if ($arrayDirArchivo[1] == $this->nombreProfesor)
                    {
                        $attachment = Attachment::fromStorage($dirArchivo);
                        array_push($arrayAttachment, $attachment);
                    }
                }

            }
        }
        return $arrayAttachment;
    }

}
