import * as React from 'react'
import { ReactNode } from 'react'
import { DataList } from './data-list'
import { IconsModule } from '../resources/icons.module'

interface Props {
    title: string
    children: ReactNode
    className?: string
    path?: string
}

export const PageContainer = ({ title, className, children }: Props) => {
    const classes = className ? `l-page ${className}` : 'l-page'
    return (
        <main className="l-main">
            <header className="main-header">
                <h2>{title}</h2>
                <DataList
                    id="clerks"
                    icon={<IconsModule.User />}
                    placeholder="Clerk's Name"
                />
            </header>
            <div className={classes}>{children}</div>
        </main>
    )
}
