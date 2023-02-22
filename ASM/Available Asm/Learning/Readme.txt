There are 2 patches available, both have .asm and .ips formats:


1. Auto Learning - If blue magic is cast, the player is guaranteed to learn it under any circumstances, even if
no characters have the learning ability.
2. Easy Learning - If blue magic is cast, the player must have 1 character with learning who does not have the following conditions:

1. Removed from party (such as during the Pyramid and Fork Tower)
2. Jumping
3. Suffering from any of the following statuses:

Status 0 (Curable)
40 Stone
20 Toad
10 Mini
02 Zombie
01 Darkness

Status 1 (Temporary)
40 Sleep
20 Paralyze
10 Charm
08 Berserk

Status 2 (Dispellable)
10 Stop

Status 3 (Special)
80 Erased
20 Controlled (will only cast Fire Sword)
04 Singing

There are 4 differences between the Easy Learning patch and the original game:
1. As stated above, statuses can prevent learning from occurring
2. Blue Magic that misses (especially important for spells like Level 5 Death) can be learned
3. The target of the Blue Magic doesn't matter 
(important for monsters you control or confuse to use Blue Magic on themselves such as Red Dragons and their Level 3 Flare)
4. Because of #3, only 1 character in your party needs learning in order to learn Blue Magic. 
There is no need to give Learning to everyone unless you are worried about status effects blocking it.


HOW TO USE

Applying the patches can be done with the following tools:
1. Lunar IPS: https://www.romhacking.net/utilities/240/
2. Asar SNES Compiler: https://github.com/RPGHacker/asar
3. SNES ROM Utility: https://www.romhacking.net/utilities/593

Lunar is easier to use, but Asar lets you change the source code and customize the patch to your liking a lot more easily. 
The Lunar patch is for unheadered ROMs only. You can convert a headered ROM to an unheadered ROM using the SNES ROM Utility. 
The Asar compiler can be used for either type of rom, however, 
headered ROMs MUST have a .smc extension, and unheadered ROMs MUST have a .sfc extension. 
Renaming the file can change the extension without any problems. 


KNOWN ISSUES
1. Learning does not occur if the Blue Magic spell is cast from a weapon with the "Effect After Attack" flag set. 
For example, if a bell were to sometimes cast Aero 2 after attacking, then Aero 2 won't be learned from it 
regardless of which patch is used. There are no such weapons in the original Final Fantasy 5, 
so this issue will only occur in Romhacks that modify weapon effects. 

2. Easy Learning.asm uses freespace in the Japanese Final Fantasy V ROM that might be used by other patches or translations. If the game shows a black screen or freezes when blue magic is cast, then either the learning function has been overwritten, or the ROM has a header when it shouldn't. In either case, fixing this issue involves modifying the !learningCheckOffset in "Easy Learning.asm" to move the code somewhere that isn't occupied by other data. Freespace can be found by opening the ROM in a Hex Editor and looking for hundreds or more bytes in a row with the same value. (00 or FF are the most common). 


CREDITS
Special thanks to the FF5 Den Discord and for giving me ideas to improve this patch (such as incorporating status ailments and party availability) and the RAM addresses I needed to make it happen quickly.

