<?php
namespace App\Enums;

enum ChestPainType: int
{
    case TypicalAngina = 0;
    case AtypicalAngina = 1;
    case NonAnginalPain = 2;
    case Asymptomatic = 3;

    public function label(): string
    {
        return match($this) {
            self::TypicalAngina => 'Typical Angina',
            self::AtypicalAngina => 'Atypical Angina',
            self::NonAnginalPain => 'Non-Anginal Pain',
            self::Asymptomatic => 'Asymptomatic',
        };
    }
}
