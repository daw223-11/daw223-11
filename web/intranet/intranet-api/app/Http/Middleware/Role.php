<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Role
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {

        if (!in_array($request->user()->rol->nombre, $roles)) {
            /* abort(403, 'Unauthorized action.'); */
            return response()->json(['message' => 'No tienes permisos para acceder a este recurso'], '403');
        }

        /* if (!$request->user()->role->nombre == 'jefatura') {
            return response()->json(['message' => 'No tienes permisos para acceder a este recurso'], '403');
        } */

        return $next($request);

    }
}
