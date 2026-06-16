import { cn } from '@/lib/utils'

interface SparkLogoProps {
  className?: string
  iconClassName?: string
  textClassName?: string
  monochrome?: boolean
  hoverColorize?: boolean
}

export function SparkLogo({
  className,
  iconClassName,
  textClassName,
  monochrome = false,
  hoverColorize = false,
}: SparkLogoProps) {
  return (
    <div className={cn('flex items-center gap-2 group', className)}>
      <svg
        viewBox="0 0 192 170"
        className={cn(
          'w-6 h-6 object-contain transition-all duration-300 group-hover:scale-110 fill-current',
          monochrome 
            ? hoverColorize 
              ? 'text-current group-hover:text-secondary' 
              : 'text-current' 
            : 'text-secondary',
          iconClassName
        )}
        aria-hidden="true"
      >
        <path d="M57.024,0l-3.04,0c-4.297,0 -8.268,2.295 -10.424,6.024l-41.935,72.538c-2.169,3.751 -2.169,8.38 0,12.131l40.546,70.139l-1.582,-32.281c-0.014,-0.294 0.063,-0.584 0.194,-0.848c0.9,-1.81 0.841,-3.964 -0.18,-5.73l-21.589,-37.345l33.196,-57.423l17.865,30.087l-14.207,24.689c-1.076,1.87 -1.076,4.174 0,6.045l14.429,25.075l-24.307,40.937l0.16,0.095l-3.978,6.699l1.388,2.4c2.156,3.729 6.127,6.024 10.424,6.024l83.892,0c4.297,0 8.268,-2.295 10.424,-6.024l40.199,-69.537l-27.536,17.893c-0.243,0.158 -0.527,0.237 -0.817,0.259c-1.976,0.146 -3.765,1.26 -4.768,2.995l-20.973,36.28l-65.644,0l17.5,-29.473l27.652,0c2.153,0 4.142,-1.152 5.218,-3.023l14.347,-24.931l55.021,0l1.736,-3.002c2.168,-3.751 2.168,-8.38 0,-12.131l-41.934,-72.538c-2.156,-3.729 -6.127,-6.024 -10.424,-6.024l-80.852,0l29.792,14.97c0.257,0.129 0.468,0.333 0.632,0.57c1.12,1.618 2.965,2.594 4.947,2.594l42.01,0l33.198,57.427l-34.558,0l-13.914,-24.179c-1.076,-1.871 -3.065,-3.023 -5.218,-3.023l-28.103,0l-24.292,-40.911l-0.053,0.032l-4.441,-7.48Z" />
      </svg>
      <span className={cn('font-heading text-xl tracking-tight flex items-center gap-1', textClassName)}>
        <span className="font-bold">Spark</span>
        <span className={cn('font-light', monochrome ? 'opacity-85' : 'text-foreground/80 dark:text-white/80')}>
          <span>Website</span>
          <span className={cn('relative -top-[7px] text-[8px] font-light ml-0.5', monochrome ? 'opacity-70' : 'text-foreground/70 dark:text-white/70')}>™</span>
        </span>
      </span>
    </div>
  )
}
