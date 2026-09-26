#include <stdint.h>
#include <stddef.h>
#define VGA ((volatile uint16_t*)0xB8000)
#define COLS 80
#define ROWS 25
#define SERIAL 0x3F8
#define KBD_STATUS 0x64
#define KBD_DATA 0x60

static size_t row,col;
static uint8_t color=0x07;
static inline void outb(uint16_t p,uint8_t v){__asm__ volatile("outb %0,%1"::"a"(v),"Nd"(p));}
static inline uint8_t inb(uint16_t p){uint8_t v;__asm__ volatile("inb %1,%0":"=a"(v):"Nd"(p));return v;}
static inline void outw(uint16_t p,uint16_t v){__asm__ volatile("outw %0,%1"::"a"(v),"Nd"(p));}
static void serial_init(void){outb(SERIAL+1,0);outb(SERIAL+3,0x80);outb(SERIAL,3);outb(SERIAL+1,0);outb(SERIAL+3,3);outb(SERIAL+2,0xC7);outb(SERIAL+4,0x0B);}
static void serial_putc(char c){while(!(inb(SERIAL+5)&0x20)){}outb(SERIAL,(uint8_t)c);}
static void putc(char c){if(c=='\n'){col=0;if(++row>=ROWS)row=ROWS-1;serial_putc(c);return;}VGA[row*COLS+col]=((uint16_t)color<<8)|(uint8_t)c;if(++col>=COLS){col=0;if(++row>=ROWS)row=ROWS-1;}serial_putc(c);}
static void puts(const char*s){while(*s)putc(*s++);}
static void clear(void){for(size_t i=0;i<COLS*ROWS;i++)VGA[i]=((uint16_t)color<<8)|' ';row=col=0;}
static int streq(const char*a,const char*b){while(*a&&*b&&*a==*b){a++;b++;}return *a==0&&*b==0;}
static const char keymap[128]={0,27,'1','2','3','4','5','6','7','8','9','0','-','=','\b','\t','q','w','e','r','t','y','u','i','o','p','[',']','\n',0,'a','s','d','f','g','h','j','k','l',';','\'','`',0,'\\','z','x','c','v','b','n','m',',','.','/',0,'*',0,' '};
static void reboot(void){puts("\nRebooting...\n");uint8_t s;do{s=inb(KBD_STATUS);}while(s&2);outb(KBD_STATUS,0xFE);for(;;)__asm__ volatile("hlt");}
static void shutdown_vm(void){puts("\nRequesting VM power-off...\n");outw(0x0604,0x2000);for(;;)__asm__ volatile("hlt");}
static void execute(const char*c){
 if(streq(c,"help"))puts("help - commands\nabout - system info\nclear - clear console\nreboot - reboot\nshutdown - power off VM\n");
 else if(streq(c,"about"))puts("BERGED OS 0.0.1\nREAL x86_64 FREESTANDING KERNEL\n");
 else if(streq(c,"clear"))clear();
 else if(streq(c,"reboot"))reboot();
 else if(streq(c,"shutdown"))shutdown_vm();
 else if(*c)puts("Unknown command. Type help.\n");
}
void kernel_main(void){
 serial_init();clear();puts("BERGED OS 0.0.1\nREAL KERNEL ONLINE\nType 'help' for commands.\n\n> ");
 char line[128];size_t n=0;
 for(;;){if(!(inb(KBD_STATUS)&1))continue;uint8_t sc=inb(KBD_DATA);if(sc&0x80)continue;char c=sc<sizeof(keymap)?keymap[sc]:0;if(!c)continue;
  if(c=='\n'){line[n]=0;putc('\n');execute(line);n=0;puts("> ");}
  else if(c=='\b'){if(n){n--;if(col)col--;putc(' ');if(col)col--;}}
  else if(n+1<sizeof(line)){line[n++]=c;putc(c);}
 }
}
