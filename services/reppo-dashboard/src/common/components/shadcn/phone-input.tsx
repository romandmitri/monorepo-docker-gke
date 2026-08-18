import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { Button } from "@/src/common/components/shadcn/button.tsx";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/src/common/components/shadcn/command.tsx";
import { Input } from "@/src/common/components/shadcn/input.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/common/components/shadcn/popover.tsx";
import { ScrollArea } from "@/src/common/components/shadcn/scroll-area.tsx";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

const PRIORITY_COUNTRIES: RPNInput.Country[] = ["US", "CA"];
const DEFAULT_COUNTRY: RPNInput.Country = "US";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

function sortCountriesWithPriority(countries: CountryEntry[], priorityCodes: RPNInput.Country[]): CountryEntry[] {
	const list = countries.filter((c): c is CountryEntry => c.value !== undefined);
	const prioritized: CountryEntry[] = [];

	for (const code of priorityCodes) {
		const index = list.findIndex((c) => c.value === code);
		if (index !== -1) {
			const [country] = list.splice(index, 1);
			prioritized.push(country);
		}
	}

	return [...prioritized, ...list];
}

type PhoneInputProps = Omit<React.ComponentProps<"input">, "onChange" | "value" | "ref"> &
	Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
		onChange?: (value: RPNInput.Value | undefined) => void;
	};

const PhoneInput = ({ className, onChange, value, ...props }: PhoneInputProps) => {
	return (
		<RPNInput.default
			className={cn("flex", className)}
			countrySelectComponent={CountrySelect}
			flagComponent={FlagComponent}
			inputComponent={InputComponent}
			initialValueFormat={"national"}
			smartCaret={false}
			defaultCountry={DEFAULT_COUNTRY}
			value={value || undefined}
			onChange={(value) => onChange?.(value)}
			{...props}
		/>
	);
};
PhoneInput.displayName = "PhoneInput";

const InputComponent = ({ className, ref, ...props }: React.ComponentProps<"input">) => (
	<Input className={cn("rounded-s-none rounded-e-md", className)} autoComplete="tel" {...props} ref={ref} />
);
InputComponent.displayName = "PhoneInputField";

type CountrySelectProps = {
	disabled?: boolean;
	value: RPNInput.Country;
	options: CountryEntry[];
	onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({ disabled, value: selectedCountry, options: countryList, onChange }: CountrySelectProps) => {
	const [searchValue, setSearchValue] = React.useState("");
	const [isOpen, setIsOpen] = React.useState(false);

	const sortedCountryList = React.useMemo(() => sortCountriesWithPriority(countryList, PRIORITY_COUNTRIES), [countryList]);

	const handleOpenChange = React.useCallback((open: boolean) => {
		setIsOpen(open);
		if (open) {
			setSearchValue("");
		}
	}, []);

	return (
		<Popover open={isOpen} modal onOpenChange={handleOpenChange}>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant="outline"
					className="flex gap-1 rounded-s-md rounded-e-none border-r-0 px-3 focus:z-10"
					disabled={disabled}
					aria-label={`Select country. Currently selected: ${selectedCountry}`}
					aria-expanded={isOpen}
					aria-haspopup="listbox"
				>
					<FlagComponent country={selectedCountry} countryName={selectedCountry} aria-hidden="true" />
					<ChevronsUpDown className={cn("-mr-2 size-4 opacity-50", disabled ? "hidden" : "opacity-100")} aria-hidden="true" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] p-0">
				<Command>
					<CommandInput value={searchValue} onValueChange={setSearchValue} placeholder="Search country..." />
					<CommandList>
						<ScrollArea className="h-72">
							<CommandEmpty>No country found.</CommandEmpty>
							<CommandGroup>
								{sortedCountryList.map(({ value, label }) =>
									value ? (
										<CountrySelectOption
											key={value}
											country={value}
											countryName={label}
											selectedCountry={selectedCountry}
											onChange={onChange}
											onSelectComplete={() => setIsOpen(false)}
										/>
									) : null,
								)}
							</CommandGroup>
						</ScrollArea>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
CountrySelect.displayName = "PhoneInputCountrySelect";

interface CountrySelectOptionProps extends RPNInput.FlagProps {
	selectedCountry: RPNInput.Country;
	onChange: (country: RPNInput.Country) => void;
	onSelectComplete: () => void;
}

const CountrySelectOption = ({ country, countryName, selectedCountry, onChange, onSelectComplete }: CountrySelectOptionProps) => {
	const handleSelect = React.useCallback(() => {
		onChange(country);
		onSelectComplete();
	}, [country, onChange, onSelectComplete]);

	return (
		<CommandItem className="gap-2" onSelect={handleSelect}>
			<FlagComponent country={country} countryName={countryName} />
			<span className="flex-1 text-sm">{countryName}</span>
			<span className="text-foreground/50 text-sm">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
			<CheckIcon className={cn("ml-auto size-4", country === selectedCountry ? "opacity-100" : "opacity-0")} />
		</CommandItem>
	);
};
CountrySelectOption.displayName = "PhoneInputCountryOption";

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
	const Flag = flags[country];

	return (
		<span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm [&_svg:not([class*='size-'])]:size-full" role="img" aria-label={countryName}>
			{Flag && <Flag title={countryName} />}
		</span>
	);
};
FlagComponent.displayName = "PhoneInputFlag";

export { PhoneInput };
export type { PhoneInputProps };
