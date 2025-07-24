<?php

class Config {
    public static function DB_NAME() {
        return Config::get_env("DB_NAME", "LostandFoundDB");
    }
    public static function DB_PORT() {
        return Config::get_env("DB_PORT", 3306); // 2506 port
    }
    public static function DB_USER() {
        return Config::get_env("DB_USER", 'root');
    }
    public static function DB_PASSWORD() {
        return Config::get_env("DB_PASSWORD", '');
    }
    public static function DB_HOST() {
        return Config::get_env("DB_HOST", 'localhost');
    }
    public static function JWT_SECRET() {
        return Config::get_env("JWT_SECRET", 'jason2000');
    }
    public static function get_env($name, $default){
        return isset($_ENV[$name]) && trim($_ENV[$name]) != "" ? $_ENV[$name] : $default;
    }
}

?>

