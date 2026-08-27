<?php

namespace App\Filament\Pages;

use App\Models\DealershipSetting;
use BackedEnum;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Schema;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Support\Facades\Storage;
use UnitEnum;

class DealershipSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationLabel = 'Paramètres de l\'Agence';
    protected static ?string $title = 'Informations de l\'Agence';
    protected static string | UnitEnum | null $navigationGroup = 'Configuration';

    protected string $view = 'filament.pages.dealership-settings';
    
    public ?array $data = []; 
    public function mount(): void
    {
        $settings = DealershipSetting::current();
        $this->form->fill($settings->attributesToArray());
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Section::make('Informations Principales')->schema([
                    TextInput::make('name')
                        ->label('Nom de l\'agence')
                        ->required(),
                    FileUpload::make('logo_path')
                        ->label('Logo')
                        ->disk('public')
                        ->directory('settings'),
                    Textarea::make('hours')
                        ->label('Horaires d\'ouverture')
                        ->rows(3),
                ])->columns(2),

                Section::make('Contact & Adresse')->schema([
                    TextInput::make('phone')
                        ->label('Numéro de téléphone')
                        ->tel(),
                    TextInput::make('whatsapp')
                        ->label('Numéro WhatsApp (avec code pays, ex: 213...)')
                        ->tel(),
                    TextInput::make('email')
                        ->label('Adresse Email')
                        ->email(),
                    Textarea::make('address')
                        ->label('Adresse physique')
                        ->columnSpanFull(),
                ])->columns(2),

                Section::make('Réseaux Sociaux & Carte')->schema([
                    TextInput::make('facebook_url')
                        ->label('Lien Facebook')
                        ->url(),
                    TextInput::make('instagram_url')
                        ->label('Lien Instagram')
                        ->url(),
                    TextInput::make('tiktok_url')
                        ->label('Lien TikTok')
                        ->url(),
                    TextInput::make('latitude')
                        ->label('Latitude Google Maps')
                        ->numeric(),
                    TextInput::make('longitude')
                        ->label('Longitude Google Maps')
                        ->numeric(),
                ])->columns(2),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $settings = DealershipSetting::current();
        $settings->update($this->form->getState());

        Notification::make()
            ->title('Paramètres enregistrés avec succès')
            ->success()
            ->send();
    }
}
