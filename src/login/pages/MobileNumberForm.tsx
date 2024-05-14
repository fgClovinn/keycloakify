import type { FormEventHandler } from "react";
import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function MobileNumberForm(props: PageProps<Extract<KcContext, { pageId: "mobile-number-form.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { url, phonenumber } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();

        if (phonenumber.disabled) return;

        setIsLoginButtonDisabled(true);

        const formElement = e.target as HTMLFormElement;

        formElement.submit();
    });

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayInfo={true}
            headerNode={msg("doLogIn")}
            infoNode={msgStr("smsPhoneNumberInstructions")}
        >
            <div id="kc-form" className={getClassName("kcContentWrapperClass")}>
                <form id="kc-sms-code-login-form" onSubmit={onSubmit} action={url.loginAction} method="post">
                    <div className={getClassName("kcFormGroupClass")}>
                        <label htmlFor="code" className={getClassName("kcLabelClass")}>
                            {msg("smsPhoneNumberLabel")}
                        </label>
                        <input
                            tabIndex={1}
                            id="code"
                            className={getClassName("kcInputClass")}
                            name="mobile_number"
                            type="text"
                            pattern="[0-9\+\-\.\ ]"
                            autoFocus={true}
                            autoComplete="off"
                        />
                    </div>
                    <div id="kc-form-buttons" className={getClassName("kcFormGroupClass")}>
                        <input
                            tabIndex={4}
                            className={clsx(
                                getClassName("kcButtonClass"),
                                getClassName("kcButtonPrimaryClass"),
                                getClassName("kcButtonBlockClass"),
                                getClassName("kcButtonLargeClass")
                            )}
                            name="login"
                            id="kc-login"
                            type="submit"
                            value={msgStr("doSubmit")}
                            disabled={isLoginButtonDisabled}
                        />
                    </div>
                </form>
            </div>
        </Template>
    );
}
