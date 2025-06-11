<?php

class Config {
    public static function DB_NAME() {
        return Config::get_env("DB_NAME", "LostandFoundDB");
    }
    public static function DB_PORT() {
        return Config::get_env("DB_PORT", 25060);
    }
    public static function DB_USER() {
        return Config::get_env("DB_USER", 'doadmin');
    }
    public static function DB_PASSWORD() {
        return Config::get_env("DB_PASSWORD", 'AVNS_2s2YOiV5ElO34FLFMLk');
    }
    public static function DB_HOST() {
        return Config::get_env("DB_HOST", 'db-mysql-fra1-60956-do-user-23033881-0.d.db.ondigitalocean.com');
    }
    public static function JWT_SECRET() {
        return Config::get_env("JWT_SECRET", 'jason2000');
    }
    public static function get_env($name, $default){
        return isset($_ENV[$name]) && trim($_ENV[$name]) != "" ? $_ENV[$name] : $default;
    }
}

?>

