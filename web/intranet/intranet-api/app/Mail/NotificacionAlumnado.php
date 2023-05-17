<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NotificacionAlumnado extends Mailable
{
    use Queueable, SerializesModels;

    public $nombreProfesor;
    /**
     * Create a new message instance.
     */
    public function __construct($nombreProfesor)
    {
        $this->nombreProfesor = $nombreProfesor;
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

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        // TODO: Crear archivo csv con la lista de alumnos según la asignatura. Aquellos que tienen p son enviados al jefe de departamento
        return [];
    }

}
