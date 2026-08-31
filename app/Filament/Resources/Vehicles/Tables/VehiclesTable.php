<?php

namespace App\Filament\Resources\Vehicles\Tables;

use App\Enums\VehicleStatus;
use App\Models\Vehicle;
use Filament\Actions\BulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class VehiclesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('primaryImage.path')
    ->label('')
    ->disk('s3')
    ->visibility('public')
    ->size(60)
    ->square(),
                TextColumn::make('brand')->label('Marque')->searchable()->sortable(),
                TextColumn::make('model')->label('Modèle')->searchable()->sortable(),
                TextColumn::make('year')->label('Année')->sortable(),
                TextColumn::make('price')
                    ->label('Prix')
                    ->formatStateUsing(fn (?string $state) => $state
                        ? number_format((float) $state, 0, ',', ' ') . ' DA'
                        : 'Contactez-nous')
                    ->sortable(),
                TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->formatStateUsing(fn (VehicleStatus $state) => $state->label())
                    ->color(fn (VehicleStatus $state) => match ($state) {
                        VehicleStatus::Available => 'success',
                        VehicleStatus::Reserved => 'warning',
                        VehicleStatus::Sold => 'danger',
                        VehicleStatus::Hidden => 'gray',
                    }),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Statut')
                    ->options(collect(VehicleStatus::cases())->mapWithKeys(fn ($c) => [$c->value => $c->label()])),
                SelectFilter::make('brand')
                    ->label('Marque')
                    ->options(fn () => Vehicle::query()->distinct()->orderBy('brand')->pluck('brand', 'brand')->toArray()),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                DeleteBulkAction::make(),
                BulkAction::make('hide')
                    ->label('Masquer la sélection')
                    ->icon('heroicon-o-eye-slash')
                    ->action(fn ($records) => $records->each->update(['status' => VehicleStatus::Hidden]))
                    ->deselectRecordsAfterCompletion(),
            ]);
    }
}

