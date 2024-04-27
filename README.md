# Gameboy Test Suites

This is a collection of test ROMs and JSON metadata describing the models they are expected to run on, their exit conditions and screenshots of the expected output.

The metadata is intented to be used to make automating and validating the result of these ROMs during emulator development.

This repository builds on the work done in [GBEmulatorShootout](https://github.com/daid/GBEmulatorShootout) and [gameboy-test-roms](https://github.com/c-sp/gameboy-test-roms), and wouldn't have been possible without the work already done in both.

## Suites

This repository includes the following test suites:

- **acid** - [dmg-acid2](https://github.com/mattcurrie/dmg-acid2), [cgb-acid2](https://github.com/mattcurrie/cgb-acid2), [cgb-acid-hell](https://github.com/mattcurrie/cgb-acid-hell)
- **[blargg](https://github.com/retrio/gb-test-roms)**
- **[CasualPokePlayer](https://github.com/CasualPokePlayer/test-roms)**
- **[gbmicrotest](https://github.com/aappleby/gbmicrotest)**
- **[Hacktix](https://github.com/Hacktix)** - [BullyGB](https://github.com/Hacktix/BullyGB), [strikethrough.gb](https://github.com/Hacktix/strikethrough.gb), [scribbltests](https://github.com/Hacktix/scribbltests)
- **[mealybug-tearoom-tests](https://github.com/mattcurrie/mealybug-tearoom-tests)**
- **[mooneye-test-suite](https://github.com/Gekkio/mooneye-test-suite)**
- **[rtc3test](https://github.com/aaaaaa123456789/rtc3test)**
- **[SameSuite](https://github.com/LIJI32/SameSuite)**
- **[which](https://github.com/mattcurrie/which.gb)**

The following test suites are (currently) omitted:

- **[AGE test roms](https://github.com/c-sp/age-test-roms)** - **TODO**
- **[daid](https://github.com/daid/GBEmulatorShootout/tree/main/testroms/daid)** - https://github.com/daid/GBEmulatorShootout/issues/27
- **[Gambatte](https://github.com/pokemon-speedrunning/gambatte-core/tree/master/test/hwtests)** - **TODO**
- **[MBC3-Tester-gb](https://github.com/EricKirschenmann/MBC3-Tester-gb)** - https://github.com/EricKirschenmann/MBC3-Tester-gb/issues/2
- **[TurtleTests](https://github.com/Powerlated/TurtleTests)** - https://github.com/Powerlated/TurtleTests/issues/2

## Suite Format

The format of the test suites is described in the [JSON Schema](./schema.json) at the root of this repository.
