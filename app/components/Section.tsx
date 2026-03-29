import { PropsWithChildren } from "react"

export const Section = (props: PropsWithChildren) => {
    return <section className="max-w-3xl px4 m-auto">
        {props.children}
    </section>
}