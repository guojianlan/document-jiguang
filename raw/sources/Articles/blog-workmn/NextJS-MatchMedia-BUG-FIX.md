---
source_url: https://blog.workmn.com/post/NextJS-MatchMedia-BUG-FIX
source_type: article
author: 用户本人（藏经阁郭大爷）
site: blog.workmn.com
publish_date: 2024-06-28
fetched_at: 2026-05-07
word_count: ~800
tags: [前端工程, Next.js, SSR, MatchMedia]
---

# 在Next.js中使用MatchMedia进行多端适配的解决方案

## NextJS与MatchMedia使用问题

### 问题分析

在应用开发中涉及多端适配时，开发者需要处理PC端和H5端的差异。Next.js作为SSR框架存在一个关键问题："代码会在服务器上运行，在服务器上运行时，没有设备的device信息"，导致媒体查询始终返回false。

这意味着使用react-responsive等npm包时，基础hooks会长期处于false状态：

```javascript
export const useIsMobile = ()=>{
    return useMediaQuery({
        query:'(max-width: 768px)'
     });
}
```

对于移动端优先的项目，这会导致始终渲染PC端代码，造成用户体验问题。

虽然Chakra-UI的hooks能解决此问题，但引入整个库过于臃肿。因此需要自定义轻量级解决方案。

### 代码展示

```javascript
function listener(query: MediaQueryList, callback: MediaQueryCallback) {
    try {
        query.addEventListener('change', callback);
        return () => query.removeEventListener('change', callback);
    } catch (e) {
        query.addListener(callback);
        return () => query.removeListener(callback);
    }
}

function getInitialValue(query: string, initialValue?: boolean) {
    if (typeof initialValue === 'boolean') {
        return initialValue;
    }

    if (typeof window !== 'undefined' && 'matchMedia' in window) {
        return window.matchMedia(query).matches;
    }

    return false;
}

export function useMediaQuery(
    query: string,
    initialValue?: boolean,
) {
    const [matches, setMatches] = useState(
         getInitialValue(query,initialValue)
    );
    const queryRef = useRef<MediaQueryList>();

    useEffect(() => {
        if ('matchMedia' in window) {
            queryRef.current = window.matchMedia(query);
            setMatches(queryRef.current.matches);
            return listener(queryRef.current, (event) => setMatches(event.matches));
        }

        return undefined;
    }, [query]);

    return matches;
}
```

## 解决办法

"其实就是加了个默认返回值"。开发者清楚项目的主要面向端口，通过添加初始值参数即可轻松解决SSR渲染问题。这种方法简洁有效，避免了引入重型UI框架库的开销。
