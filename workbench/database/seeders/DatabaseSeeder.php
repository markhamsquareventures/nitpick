<?php

namespace Workbench\Database\Seeders;

use Illuminate\Database\Seeder;
use Workbench\App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            'nick@example.test' => 'Nick',
            'arthur@workbench.test' => 'Arthur Admin',
            'mia@workbench.test' => 'Mia Member',
        ];

        foreach ($users as $email => $name) {
            User::query()->firstOrCreate(
                ['email' => $email],
                [
                    'name' => $name,
                    'password' => bcrypt('password'),
                ]
            );
        }
    }
}
