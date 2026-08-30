<?php

namespace App\Filament\Resources\Vehicles\Schemas;

use App\Enums\VehicleStatus;
use App\Models\Vehicle;
use Closure;
use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;

class VehicleForm
{
    public static function configure(Schema $schema): Schema
    {
        $rules = Vehicle::rules();

        return $schema->components([
            Tabs::make('Véhicule')
                ->columnSpanFull()
                ->tabs([

                    Tab::make('Informations générales')
                        ->columns(2)
                        ->schema([
                            TextInput::make('brand')->label('Marque')->required()->rules($rules['brand']),
                            TextInput::make('model')->label('Modèle')->required()->rules($rules['model']),
                            TextInput::make('year')->label('Année')->numeric()->required()->rules($rules['year']),
                            TextInput::make('mileage')->label('Kilométrage')->numeric()->suffix('km')->required()->rules($rules['mileage']),
                            Select::make('body_type')
                                ->label('Carrosserie')
                                ->options([
                                    'Berline' => 'Berline', 'Citadine' => 'Citadine', 'SUV' => 'SUV',
                                    'Break' => 'Break', 'Utilitaire' => 'Utilitaire', 'Monospace' => 'Monospace',
                                    'Pickup' => 'Pickup',
                                ])
                                ->required()
                                ->rules($rules['body_type']),
                        ]),

                    Tab::make('Prix')
                        ->schema([
                            TextInput::make('price')
                                ->label('Prix (DZD)')
                                ->numeric()
                                ->helperText('Laisser vide pour afficher « Contactez-nous pour le prix »')
                                ->rules($rules['price']),
                            Toggle::make('negotiable')->label('Négociable')->default(true),
                        ]),

                    Tab::make('Caractéristiques techniques')
                        ->columns(2)
                        ->schema([
                            Select::make('fuel_type')
                                ->label('Carburant')
                                ->options([
                                    'essence' => 'Essence', 'diesel' => 'Diesel', 'hybride' => 'Hybride',
                                    'electrique' => 'Électrique', 'gpl' => 'GPL',
                                ])
                                ->required()
                                ->rules($rules['fuel_type']),
                            Select::make('transmission')
                                ->label('Transmission')
                                ->options(['manuelle' => 'Manuelle', 'automatique' => 'Automatique'])
                                ->required()
                                ->rules($rules['transmission']),
                            TextInput::make('engine_power')->label('Puissance moteur')->placeholder('1.5L / 90ch')->rules($rules['engine_power']),
                            Select::make('doors')->label('Portes')->options([3 => 3, 5 => 5])->rules($rules['doors']),
                            TextInput::make('exterior_color')->label('Couleur extérieure')->rules($rules['exterior_color']),
                            TextInput::make('interior_color')->label('Couleur intérieure')->rules($rules['interior_color']),
                        ]),

                    Tab::make('État')
                        ->columns(2)
                        ->schema([
                            Select::make('condition')
                                ->label('État général')
                                ->options(['neuf' => 'Neuf', 'occasion' => 'Occasion'])
                                ->required()
                                ->rules($rules['condition']),
                            Select::make('paint_condition')
                                ->label('Peinture')
                                ->options(['Originale' => 'Originale', 'Retouchée' => 'Retouchée', 'Repeinte' => 'Repeinte'])
                                ->rules($rules['paint_condition']),
                            Toggle::make('has_accident_history')->label("Historique d'accident")->rules($rules['has_accident_history']),
                            TextInput::make('previous_owners')->label('Nombre de propriétaires (main)')->numeric()->rules($rules['previous_owners']),
                        ]),

                    Tab::make('Documentation')
                        ->schema([
                            TextInput::make('carte_grise')->label('Carte grise')->placeholder('Carte grise Safia, à jour')->rules($rules['carte_grise']),
                            Textarea::make('document_notes')->label('Notes sur les documents')->rules($rules['document_notes']),
                        ]),

                    Tab::make('Description & Options')
                        ->schema([
                            Textarea::make('description')->label('Description')->rows(5)->columnSpanFull()->rules($rules['description']),
                            CheckboxList::make('features')
                                ->label('Équipements')
                                ->columns(2)
                                ->columnSpanFull()
                                ->options([
                                    'Climatisation' => 'Climatisation', 'GPS' => 'GPS', 'Toit ouvrant' => 'Toit ouvrant',
                                    'Caméra de recul' => 'Caméra de recul', 'Sièges cuir' => 'Sièges cuir',
                                    'Vitres électriques' => 'Vitres électriques', 'Bluetooth' => 'Bluetooth',
                                    'Régulateur de vitesse' => 'Régulateur de vitesse', 'ABS' => 'ABS', 'Airbags' => 'Airbags',
                                ])
                                ->rules($rules['features']),
                        ]),

                    Tab::make('Photos')
                        ->schema([
                            Repeater::make('images')
                                ->relationship()
                                ->label('')
                                ->schema([
                                    FileUpload::make('path')
                                        ->label('Image')
                                        ->image()
                                        ->disk('s3')
                                        ->directory('vehicles')
                                        ->visibility('public')
                                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                        ->maxSize(4096) // 4 MB
                                        ->imageResizeMode('cover')
                                        ->imageResizeTargetWidth('1600')
                                        ->imageResizeTargetHeight('1200')
                                        ->imagePreviewHeight('150')
                                        ->required()
                                        ->columnSpan(2),
                                    Toggle::make('is_primary')
                                        ->label('Photo principale')
                                        ->live()
                                        ->distinct()
                                        ->fixIndistinctState(),
                                ])
                                ->columns(3)
                                ->orderColumn('sort_order')
                                ->defaultItems(3)
                                ->addActionLabel('Ajouter une photo')
                                ->collapsible()
                                ->deletable()
                                ->reorderable(),
                        ]),

                    Tab::make('Publication')
                        ->schema([
                            Select::make('status')
                                ->label('Statut')
                                ->options(collect(VehicleStatus::cases())->mapWithKeys(fn ($case) => [$case->value => $case->label()]))
                                ->default(VehicleStatus::Available->value)
                                ->required()
                                ->native(false)
                                ->rules($rules['status'])
                                ->rule(function (Get $get) {
                                    return function (string $attribute, $value, Closure $fail) use ($get) {
                                        if ($value === VehicleStatus::Available->value && empty($get('images'))) {
                                            $fail('Impossible de publier un véhicule « Disponible » sans au moins une image.');
                                        }
                                    };
                                }),
                        ]),

                ]),
        ]);
    }
}