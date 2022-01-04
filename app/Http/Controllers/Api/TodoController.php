<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    /**
     * List Todos for only the authenticated user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $todos = Todo::all();

        //TODO: Implement this method

        return response()->json($todos);
    }

    /**
     * Create a new Todo for the authenticated user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $description = $request->input('description');
        $user_id = $request->user()->id;
        if($description) {
            $todo = new Todo();
            $todo->description = $description;
            $todo->user_id = $user_id;
            $todo->save();
        }

        $todos = Todo::all();

        return response()->json($todos);
    }

    /**
     * Update a Todo for the authenticated user
     *
     * @param Request $request
     * @param $todoId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $todoId)
    {
        //TODO: Implement this method
        $todo = Todo::findOrFail($todoId);
        $todo->completed_at = date("Y-m-d H:m:s");
        $todo->save();

        $todos = Todo::all();
        return response()->json($todos);
    }

    /**
     * Delete a Todo for the authenticated user
     *
     * @param Request $request
     * @param $todoId
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, $todoId)
    {
        //TODO: Implement this method
        $todo = Todo::findOrFail($todoId);
        $todo->delete();

        $todos = Todo::all();
        return response()->json($todos);
    }
}
